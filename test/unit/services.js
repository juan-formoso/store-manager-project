const { expect } = require('chai');
const sinon = require('sinon');
const productsModel = require('../../models/products');
const salesModel = require('../../models/sales');
const productsService = require('../../services/products');
const salesService = require('../../services/sales');

const products = [
  {
    "id": 1,
    "name": "produto A",
    "quantity": 10
  },
  {
    "id": 2,
    "name": "produto B",
    "quantity": 20
  }
];

describe('Testa productsService', () => {
  describe('Testa insertProduct', () => {
    const productQuantity = {
      name: "produto",
      quantity: 10
    };
    describe('Ao adicionar um produto com sucesso', () => {
      before(async () => {
        const product = { id: 1, name: "produto", quantity: 10 }
        sinon.stub(productsModel, 'insertProduct').resolves(product);
      });
      after(async () => {
        productsModel.insertProduct.restore();
      });
      it('Retornar um objeto', async () => {
        const newProduct = await productsService.insertProduct(productQuantity);
        expect(newProduct).to.be.a('object');
      });
      it('O objeto contém as propriedades "id", "name" e "quantity"', async () => {
        const newProduct = await productsService.insertProduct(productQuantity);
        expect(newProduct).to.have.a.property('id');
        expect(newProduct).to.have.a.property('name');
        expect(newProduct).to.have.a.property('quantity');
      });
      it('Retorna o objeto esperado', async () => {
        const result = { "id": 1, "name": "produto", "quantity": 10 };
        const newProduct = await productsService.insertProduct(productQuantity);
        expect(newProduct).to.be.deep.equal(result);
      });
    });
    describe('Se o produto não for adicionado', () => {
      before(async () => {
        sinon.stub(productsModel, 'insertProduct').throws();
      });
      after(async () => {
        productsModel.insertProduct.restore();
      });
      it('Retorna a mensagem de erro', async () => {
        const newProduct = await productsService.insertProduct(productQuantity);
        expect(newProduct).to.throw;
      });
    });
  });
  describe('Testa função getAll', () => {
    describe('Se não existir produtos cadastrados', () => {
      before(async () => {
        const execute = []
        sinon.stub(productsModel, 'getAll').resolves(execute);
      });
      after(async () => {
        productsModel.getAll.restore();
      });
      it('Retorna um array', async () => {
        const allProducts = await productsService.getAll();
        expect(allProducts).to.be.a('array');
      });
      it('Retorna um array vazio', async () => {
        const allProducts = await productsService.getAll();
        expect(allProducts).to.be.empty;
      });
    });
    describe('Se existirem produtos cadastrados', () => {
      before(async () => {
        const execute = products;
        sinon.stub(productsModel, 'getAll').resolves(execute);
      });
      after(async () => {
        productsModel.getAll.restore();
      });
      it('Retorna um array', async () => {
        const allProducts = await productsService.getAll();
        expect(allProducts).to.be.an('array');
      });
      it('Verifica se o array não está vázio', async () => {
        const allProducts = await productsService.getAll();
        expect(allProducts).to.be.not.empty;
      });
      it('Os elementos possuem as propriedades "id", "name", "quantity"', async () => {
        const allProducts = await productsService.getAll();
        expect(allProducts[0]).to.be.a.property('id');
        expect(allProducts[0]).to.be.a.property('name');
        expect(allProducts[0]).to.be.a.property('quantity');
      });
      it('Retorna um array contendo os produtos', async () => {
        const result = {
          "id": 2,
          "name": "produto B",
          "quantity": 20
        };
        const allProducts = await productsService.getAll();
        expect(allProducts.length).to.be.equal(2);
        expect(allProducts[1]).to.be.deep.equal(result);
      });
    });
    describe('Ao retornar um erro', () => {
      before(async () => {
        sinon.stub(productsModel, 'getAll').throws();
      });
      after(async () => {
        productsModel.getAll.restore();
      });
      it('Retorna uma mensagem de erro', async () => {
        const newProduct = await productsService.getAll();
        expect(newProduct).to.throw;
      });
    });
  });
  describe('Testa getByName', () => {
    describe('Se a propriedade "name" estiver vazia', () => {
      before(async () => {
        const execute = [];
        sinon.stub(productsModel, 'getByName').resolves(execute);
      });
      after(async () => {
        productsModel.getByName.restore();
      });
      it('Retorna um array', async () => {
        const name = await productsService.getByName('qualquer');
        expect(name).to.be.a('array');
      });
      it('Retorna um array vazio', async () => {
        const name = await productsService.getByName('qualquer');
        expect(name).to.be.empty;
      });
    });
    describe('Aos parâmetros serem passados corretamente', () => {
      before(async () => {
        const execute = [
          {
            "id": 1,
            "name": "produto A",
            "quantity": 10
          }
        ];
        sinon.stub(productsModel, 'getByName').resolves(execute);
      });
      after(async () => {
        productsModel.getByName.restore();
      });
      it('Retorna um array com um objeto', async () => {
        const name = await productsService.getByName('produto A');
        expect(name).to.be.an('array');
        expect(name[0]).to.be.a('object');
      });
      it('Verifica se o array não está vazio', async () => {
        const name = await productsService.getByName('produto A');
        expect(name).to.be.not.empty;
      });
      it('Verifica se o produto possui as propriedades "id", "name", "quantity"', async () => {
        const name = await productsService.getByName('produto A');
        expect(name[0]).to.be.a.property('id');
        expect(name[0]).to.be.a.property('name');
        expect(name[0]).to.be.a.property('quantity');
      });
      it('Retorna um array com o produto em um objeto', async () => {
        const result = {
          "id": 1,
          "name": "produto A",
          "quantity": 10
        };
        const name = await productsService.getByName('produto A');
        expect(name[0]).to.be.deep.equal(result);
      });
    });
    describe('Ao retornar um erro', () => {
      before(async () => {
        sinon.stub(productsModel, 'getByName').throws();
      });
      after(async () => {
        productsModel.getByName.restore();
      });
      it('Retorna a mensagem de erro', async () => {
        const name = await productsService.getByName('produto A');
        expect(name).to.be.throw;
      });
    });
  });
  describe('Testa getById', () => {
    describe('Se o parâmetro "id" estiver vazio', () => {
      before(async () => {
        const execute = []
        sinon.stub(productsModel, 'getById').resolves(execute);
      });
      after(async () => {
        productsModel.getById.restore();
      });
      it('Retorna um array', async () => {
        const id = await productsService.getById(30);
        expect(id).to.be.a('array');
      });
      it('Retorna um array vazio', async () => {
        const id = await productsService.getById(30);
        expect(id).to.be.empty;
      });
    });
    describe('Ao passar os parâmetros corretamente', () => {
      before(async () => {
        const execute = [
          {
            "id": 2,
            "name": "produto B",
            "quantity": 20
          }
        ];
        sinon.stub(productsModel, 'getById').resolves(execute);
      });
      after(async () => {
        productsModel.getById.restore();
      });
      it('Retorna um array com um objeto', async () => {
        const id = await productsService.getById(2);
        expect(id).to.be.an('array');
        expect(id[0]).to.be.a('object');
      });
      it('Verifica se o objeto não está vazio', async () => {
        const id = await productsService.getById(2);
        expect(id[0]).to.be.not.empty;
      });
      it('Verifica se o objeto contém as propriedades "id", "name", "quantity"', async () => {
        const id = await productsService.getById(2);
        expect(id[0]).to.be.a.property('id');
        expect(id[0]).to.be.a.property('name');
        expect(id[0]).to.be.a.property('quantity');
      });
      it('Retorna um objeto com o produto', async () => {
        const result = {
          "id": 2,
          "name": "produto B",
          "quantity": 20
        };
        const id = await productsService.getById(2);
        expect(id[0]).to.be.deep.equal(result);
      });
    });
    describe('Ao retornar um erro', () => {
      before(async () => {
        sinon.stub(productsModel, 'getById').throws();
      });
      after(async () => {
        productsModel.getById.restore();
      });
      it('Retorna uma mensagem de erro', async () => {
        const name = await productsService.getById(1);
        expect(name).to.be.throw;
      });
    });
  });
  describe('Testa updateProduct', () => {
    const productQuantity = {
      id: 1,
      name: "produto alterado",
      quantity: 5
    };
    describe('Ao adicionar um produto com sucesso', () => {
      before(async () => {
        const product = { id: 1, name: "produto alterado", quantity: 5 }
        sinon.stub(productsModel, 'updateProduct').resolves(product);
      });
      after(async () => {
        productsModel.updateProduct.restore();
      });
      it('Retorna um objeto', async () => {
        const updatedProduct = await productsService.updateProduct(productQuantity);
        expect(updatedProduct).to.be.a('object');
      });
      it('O objeto contém as propriedades "id", "name" e "quantity"', async () => {
        const updatedProduct = await productsService.updateProduct(productQuantity);
        expect(updatedProduct).to.have.a.property('id');
        expect(updatedProduct).to.have.a.property('name');
        expect(updatedProduct).to.have.a.property('quantity');
      });
      it('Retorna o objeto esperado', async () => {
        const result = { "id": 1, "name": "produto alterado", "quantity": 5 };
        const updatedProduct = await productsService.updateProduct(productQuantity);
        expect(updatedProduct).to.be.deep.equal(result);
      });
    });
    describe('Se o prouduto não for adicionado', () => {
      before(async () => {
        sinon.stub(productsModel, 'updateProduct').throws();
      });
      after(async () => {
        productsModel.updateProduct.restore();
      });
      it('Retorna uma mensagem de erro', async () => {
        const updatedProduct = await productsService.updateProduct(productQuantity);
        expect(updatedProduct).to.throw;
      });
    });
  });
  describe('Testa deleteById', () => {
    const id = 1;
    const productId = { id: 1 }
    describe('Ao deletar um produto com sucesso', () => {
      before(async () => {
        const execute = productId;
        sinon.stub(productsModel, 'deleteById').resolves(execute);
      });
      after(async () => {
        productsModel.deleteById.restore();
      });
      it('Retorna um objeto', async () => {
        const deletedProduct = await productsService.deleteById(id);
        expect(deletedProduct).to.be.a('object');
      });
      it('O objeto deve conter as propiedades "id", "name" e "quantity"', async () => {
        const deletedProduct = await productsService.deleteById(id);
        expect(deletedProduct).to.have.a.property('id');
      });
      it('Retorna o objeto esperado', async () => {
        const deletedProduct = await productsService.deleteById(id);
        expect(deletedProduct).to.be.deep.equal({id: 1});
      });
    });
    describe('Ao retornar um erro', () => {
      before(async () => {
        sinon.stub(productsModel, 'deleteById').throws();
      });
      after(async () => {
        productsModel.deleteById.restore();
      });
      it('Retorna a mensagem de erro', async () => {
        const deletedProduct = await productsService.deleteById(id);
        expect(deletedProduct).to.be.throw;
      });
    });
  });
});

describe('Testa salesService', () => {
  describe('Testa newSale', () => {
    describe('Ao retornar um erro', () => {
      before(async () => {
        sinon.stub(salesModel, 'newSale').throws();
      });
      after(async () => {
        salesModel.newSale.restore();
      });
      it('Retorna a mensagem de erro', async () => {
        const newSale = await salesService.newSale();
        expect(newSale).to.be.throw;
      });
    });
  });
});
