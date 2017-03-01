'use strict';

const supertest = require('supertest');
const app = require('../../src/app');
const chai = require('chai');

global.app = app;
global.request = supertest(app);
global.expect = chai.expect;
