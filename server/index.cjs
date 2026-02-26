/**
 * @fileoverview Express backend server for the News Portal application.
 * Provides REST API endpoints for articles management.
 * @module server
 * @author Student
 * @version 1.0.0
 */

const express = require('express');
const cors = require('cors');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const { articles } = require('./data/articles.cjs');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// --- Swagger Setup ---

/**
 * Swagger/OpenAPI configuration options.
 * @type {Object}
 */
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'News Portal API',
      version: '1.0.0',
      description: 'REST API for the News Portal application. Provides endpoints for retrieving cybersecurity news articles.',
      contact: {
        name: 'Student Developer',
      },
      license: {
        name: 'MIT',
        url: 'https://opensource.org/licenses/MIT',
      },
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
        description: 'Local development server',
      },
    ],
  },
  apis: ['./server/index.cjs'],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// --- API Routes ---

/**
 * @openapi
 * components:
 *   schemas:
 *     Article:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: Unique article identifier
 *           example: 1
 *         title:
 *           type: string
 *           description: Article title
 *           example: "Zero Trust на практиці"
 *         excerpt:
 *           type: string
 *           description: Short article summary
 *           example: "Мінімальний набір кроків..."
 *         date:
 *           type: string
 *           format: date
 *           description: Publication date
 *           example: "2025-12-15"
 *         image:
 *           type: string
 *           format: uri
 *           description: URL of article cover image
 *           example: "https://picsum.photos/seed/sec1/900/500"
 *         content:
 *           type: string
 *           description: Full article content
 *         status:
 *           type: string
 *           enum: [draft, published]
 *           description: Publication status
 *           example: "published"
 *     Error:
 *       type: object
 *       properties:
 *         error:
 *           type: string
 *           description: Error message
 */

/**
 * @openapi
 * /api/articles:
 *   get:
 *     summary: Get all articles
 *     description: Returns a list of all cybersecurity news articles. Supports optional filtering by publication status.
 *     tags:
 *       - Articles
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [draft, published]
 *         description: Filter articles by status
 *     responses:
 *       200:
 *         description: A list of articles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Article'
 */
app.get('/api/articles', (req, res) => {
  /**
   * GET /api/articles handler.
   * @param {Object} req - Express request (query: ?status=draft|published)
   * @param {Object} res - Express response
   * @returns {void} Sends JSON array of articles
   */
  const { status } = req.query;
  let result = articles;

  if (status) {
    result = articles.filter((a) => a.status === status);
  }

  res.json(result);
});

/**
 * @openapi
 * /api/articles/{id}:
 *   get:
 *     summary: Get article by ID
 *     description: Returns a single article by its unique identifier.
 *     tags:
 *       - Articles
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The article ID
 *     responses:
 *       200:
 *         description: Article found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Article'
 *       404:
 *         description: Article not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               error: "Article not found"
 */
app.get('/api/articles/:id', (req, res) => {
  /**
   * GET /api/articles/:id handler.
   * @param {Object} req - Express request (params: id)
   * @param {Object} res - Express response
   * @returns {void} Sends JSON article or 404 error
   */
  const id = Number(req.params.id);
  const article = articles.find((a) => a.id === id);

  if (!article) {
    return res.status(404).json({ error: 'Article not found' });
  }

  res.json(article);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log(`Swagger UI available at http://localhost:${PORT}/api-docs`);
});
