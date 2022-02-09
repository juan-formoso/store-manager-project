const { expect } = require('chai');
const sinon = require('sinon');
const productsService = require('../../services/products');
const productsController = require('../../controllers/products');

describe('Testa productsController', () => {
  describe('Testa createProduct', () => {
    describe('Ao criar o produto com sucesso', () => {
      const res = {};
      const req = {};
      before(() => {
        req.body = { "name": "produto", "quantity": 10 };
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();
        sinon.stub(productsService, 'insertProduct').resolves(true);
      });
      after(() => productsService.insertProduct.restore());
      it('Retorna o status 201', async () => {
        await productsController.createProduct(req, res);
        expect(res.status.calledWith(201)).to.be.equal(true);
      });
    });
  });
  describe('Testa getAll', () => {
    describe('Ao buscar todos os produtos com sucesso', () => {
      const res = {};
      const req = {};
      before(() => {
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();
        sinon.stub(productsService, 'getAll').resolves(true);
      });
      after(() => productsService.getAll.restore());
      it('Retorna o status 200', async () => {
        await productsController.getAll(req, res);
        expect(res.status.calledWith(200)).to.be.equal(true);
      });
    });
    describe('Ao retornar um erro', () => {
      const res = {};
      const req = {};
      before(() => {
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();
        sinon.stub(productsService, 'getAll').rejects(true);
      });
      after(() => productsService.getAll.restore());
      it('Retorna o status 500', async () => {
        await productsController.getAll(req, res);
        expect(res.status.calledWith(500)).to.be.equal(false);
      });      
    });
  });
  describe('Testa getById', () => {
    describe('Se o produto não for encontrado', () => {
      const res = {};
      const req = {};
      before(() => {
        req.params = { id: 1 };
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();
        sinon.stub(productsService, 'getById').resolves(false);
      });
      after(() => productsService.getById.restore());
      it('Retorna o status 404', async () => {
        await productsController.getById(req, res);
        expect(res.status.calledWith(404)).to.be.equal(true);
      });
    });
    describe('Ao buscar o produto com sucesso de acordo com o id', () => {
      const res = {};
      const req = {};
      before(() => {
        req.params = { id: 1 };
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();
        sinon.stub(productsService, 'getById').resolves(true);
      });
      after(() => productsService.getById.restore());
      it('Retorna o status 200', async () => {
        await productsController.getById(req, res);
        expect(res.status.calledWith(200)).to.be.equal(false);
      });
    });
    describe('Ao retornar um erro', () => {
      const res = {};
      const req = {};
      before(() => {
        req.params = { id: 1 };
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();
        sinon.stub(productsService, 'getById').rejects(true);
      });
      after(() => productsService.getById.restore());
      it('Retorna o status 500', async () => {
        await productsController.getById(req, res);
        expect(res.status.calledWith(500)).to.be.equal(false);
      });      
    });
  });
});
