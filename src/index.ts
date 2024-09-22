import { Hono } from 'hono';
import { cors } from 'hono/cors';

type Bindings = {
    GEMINI_API_KEY: string;
    AI: Ai;
}

const app = new Hono<{ Bindings: Bindings }>();

app.use(
    '*',
    cors({
        origin: '*',
        allowHeaders: ['X-Custom-Headers', 'Upgrade-Insecure-Requests', 'Content-Type'],
        allowMethods: ['POST', 'GET', 'OPTIONS', 'PUT'],
        exposeHeaders: ['Content-length', 'X-Kuma-Revision'],
        maxAge: 600,
        credentials: true,
    })
)

app.post('/translatedocument', async (c) => {
	console.log("HAS BEEN CALLED")
    try {
        const { documentData, targeting } = await c.req.json();

        if (!documentData || !targeting) {
            return c.json({ error: 'Missing required parameters' }, 400);
        }

        // Generate a summary
        const summaryResult = await c.env.AI.run('@cf/facebook/bart-large-cnn', {
            input_text: documentData,
            max_length: 10000,
        });

        if (!summaryResult.summary) {
            return c.json({ error: 'Failed to generate summary' }, 500);
        }

        // Translate the summary
        const translationResult = await c.env.AI.run('@cf/meta/m2m100-1.2b', {
            text: summaryResult.summary,
            source_lang: 'english',
            target_lang: targeting,
        });

        if (!translationResult.translated_text) {
            return c.json({ error: 'Failed to translate text' }, 500);
        }

        return c.json({ translated_text: translationResult.translated_text });
    } catch (error) {
        console.error('Error in /translatedocument:', error);
        return c.json({ error: 'Internal server error' }, 500);
    }
});

export default app;
