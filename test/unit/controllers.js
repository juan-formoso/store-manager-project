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
});
