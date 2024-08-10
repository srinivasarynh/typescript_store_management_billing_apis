import { OpenAPIV3 } from 'openapi-types';
import config from '../config';

const swaggerDocument: OpenAPIV3.Document = {
    openapi: '3.0.0',
    info: {
        title: 'Items and Billing API',
        version: '1.0.0',
        description: 'API for managing items and billing',
    },
    servers: [
        {
            url: config.BASE_URL,
        },
    ],
    paths: {
        '/api/v1/items': {
            get: {
                summary: 'Get all items',
                description: 'Retrieve a list of all items in the store',
                responses: {
                    '200': {
                        description: 'A list of items',
                    },
                },
            },
            post: {
                summary: 'Create an item',
                description: 'Create a new item in the store',
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    name: {
                                        type: 'string',
                                        example: 'item 4',
                                    },
                                    description: {
                                        type: 'string',
                                        example: 'item 4',
                                    },
                                    category: {
                                        type: 'string',
                                        example: 'category',
                                    },
                                    price: {
                                        type: 'number',
                                        example: 100,
                                    },
                                    quantity_in_stock: {
                                        type: 'number',
                                        example: 20,
                                    },
                                },
                                required: ['name', 'description', 'category', 'price', 'quantity_in_stock'],
                            },
                        },
                    },
                },
                responses: {
                    '201': {
                        description: 'Item created successfully',
                    },
                    '400': {
                        description: 'Bad Request',
                    },
                },
            },
        },

        '/api/v1/items/{id}': {
            get: {
                summary: 'Get a single item',
                description: 'Retrieve a single item by its ID',
                parameters: [
                    {
                        name: 'id',
                        in: 'path',
                        required: true,
                        schema: {
                            type: 'string',
                        },
                        description: 'ID of the item to retrieve',
                    },
                ],
                responses: {
                    '200': {
                        description: 'A single item',
                    },
                    '404': {
                        description: 'Item not found',
                    },
                },
            },
            put: {
                summary: 'Update an item',
                description: 'Update an existing item by its ID',
                parameters: [
                    {
                        name: 'id',
                        in: 'path',
                        required: true,
                        schema: {
                            type: 'string',
                        },
                        description: 'ID of the item to update',
                    },
                ],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    name: {
                                        type: 'string',
                                        example: 'item 4 updated',
                                    },
                                    description: {
                                        type: 'string',
                                        example: 'item 4 description',
                                    },
                                    category: {
                                        type: 'string',
                                        example: 'category',
                                    },
                                    price: {
                                        type: 'number',
                                        example: 200,
                                    },
                                    quantity_in_stock: {
                                        type: 'number',
                                        example: 6,
                                    },
                                },
                                required: ['name', 'description', 'category', 'price', 'quantity_in_stock'],
                            },
                        },
                    },
                },
                responses: {
                    '200': {
                        description: 'Item updated successfully',
                    },
                    '400': {
                        description: 'Bad Request',
                    },
                    '404': {
                        description: 'Item not found',
                    },
                },
            },
            delete: {
                summary: 'Delete an item',
                description: 'Delete an existing item by its ID',
                parameters: [
                    {
                        name: 'id',
                        in: 'path',
                        required: true,
                        schema: {
                            type: 'string',
                        },
                        description: 'ID of the item to update',
                    },
                ],
                responses: {
                    '204': {
                        description: 'Item Deleted successfully',
                    },
                    '400': {
                        description: 'Bad Request',
                    },
                    '404': {
                        description: 'Item not found',
                    },
                },
            },
        },

        '/api/v1/bills': {
            get: {
                summary: 'Get all bills',
                description: 'Retrieve a list of all bills in the store',
                responses: {
                    '200': {
                        description: 'A list of bills',
                    },
                },
            },
            post: {
                summary: 'Create a bill',
                description: 'Create a new bill for an item in the store',
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    item_id: {
                                        type: 'string',
                                        example: '345676543456765',
                                    },
                                    name: {
                                        type: 'string',
                                        example: 'item 4',
                                    },
                                    quantity: {
                                        type: 'number',
                                        example: 10,
                                    },
                                    price_per_unit: {
                                        type: 'number',
                                        example: 10,
                                    },
                                    total_price: {
                                        type: 'number',
                                        example: 100,
                                    },
                                    customer_name: {
                                        type: 'string',
                                        example: 'customer name',
                                    },
                                },
                                required: ['item_id', 'name', 'quantity', 'price_per_unit', 'total_price'],
                            },
                        },
                    },
                },
                responses: {
                    '201': {
                        description: 'Bill created successfully',
                    },
                    '400': {
                        description: 'Bad Request',
                    },
                    '404': {
                        description: 'Item not found'
                    }
                },
            },
        },
        '/api/v1/bills/{id}': {
            get: {
                summary: 'Get a single bill',
                description: 'Retrieve a single bill by its ID',
                parameters: [
                    {
                        name: 'id',
                        in: 'path',
                        required: true,
                        schema: {
                            type: 'string',
                        },
                        description: 'ID of the bill to retrieve',
                    },
                ],
                responses: {
                    '200': {
                        description: 'A single Bill',
                    },
                    '404': {
                        description: 'Bill not found',
                    },
                },
            },
            delete: {
                summary: 'Delete a bill',
                description: 'Delete an existing bill by its ID',
                parameters: [
                    {
                        name: 'id',
                        in: 'path',
                        required: true,
                        schema: {
                            type: 'string',
                        },
                        description: 'ID of the bill to delete',
                    },
                ],
                responses: {
                    '204': {
                        description: 'Bill Deleted successfully',
                    },
                    '400': {
                        description: 'Bad Request',
                    },
                    '404': {
                        description: 'Bill not found',
                    },
                },
            },
        }
    },
};

export default swaggerDocument;