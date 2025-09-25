// src/types.js

/**
 * @typedef {Object} Task
 * @property {string} id
 * @property {string} title
 * @property {'todo'|'in-progress'|'done'} status
 * @property {string[]} tags
 * @property {Task[]} subtasks
 * @property {string} createdAt
 * @property {string} updatedAt
 */

/**
 * @typedef {Object} Project
 * @property {string} id
 * @property {string} name
 * @property {Task[]} tasks
 */

/**
 * @typedef {Object} Filters
 * @property {string[]} statuses
 * @property {string[]} tags
 * @property {string} search
 */

/**
 * @typedef {Object} TodoAppData
 * @property {Project[]} projects
 * @property {Filters} filters
 */
