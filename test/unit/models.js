const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../models/connection');
const productsModel = require('../../models/products');
const salesModel = require('../../models/sales');

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

describe('Testa productsModel', () => {
  describe('Testa insertProduct', () => {
    const productQuantity = {
      name: "produto",
      quantity: 10
    };
    describe('Ao adicionar um produto corretamente', () => {
      before(async () => {
        const execute = [{ insertId: 1 }]
        sinon.stub(connection, 'execute').resolves(execute);
      });
      after(async () => {
        connection.execute.restore();
      });
      it('Ao retornar um objeto', async () => {
        const newProduct = await productsModel.insertProduct(productQuantity);
        expect(newProduct).to.be.a('object');
      });
      it('Ao retornar um objeto com as propriedades "id", "name" e "quantity"', async () => {
        const newProduct = await productsModel.insertProduct(productQuantity);
        expect(newProduct).to.have.a.property('id');
        expect(newProduct).to.have.a.property('name');
        expect(newProduct).to.have.a.property('quantity');
      });
      it('Ao retornar o objeto corretamente', async () => {
        const result = { "id": 1, "name": "produto", "quantity": 10 };
        const newProduct = await productsModel.insertProduct(productQuantity);
        expect(newProduct).to.be.deep.equal(result);
      });
    });
    describe('Ao retornar um erro', () => {
      const error = { error: true, codeStatus: 500, message: 'Internal Server Error' }
      before(async () => {
        sinon.stub(connection, 'execute').rejects(true);
      });
      after(async () => {
        connection.execute.restore();
      });
      it('Ao retornar a mensagem de erro', async () => {
        const newProduct = await productsModel.insertProduct(productQuantity);
        expect(newProduct).to.be.deep.equal(error);
      });
      it('Ao retornar um objeto contendo as propriedades "error", "codeStatus" e "message"', async () => {
        const newProduct = await productsModel.insertProduct(productQuantity);
        expect(newProduct).to.be.a('object');
        expect(newProduct).to.have.property('error');
        expect(newProduct).to.have.property('codeStatus');
        expect(newProduct).to.have.property('message');
      });
    });
  });
  describe('Testa getAll', () => {
    describe('Se não houver nenhum produto cadastrado', () => {
      before(async () => {
        const execute = [[], [{}], [{}] ]
        sinon.stub(connection, 'execute').resolves(execute);
      });
      after(async () => {
        connection.execute.restore();
      });
      it('Ao retornar um array', async () => {
        const productAll = await productsModel.getAll();
        expect(productAll).to.be.a('array');
      });

      it('Ao retornar um array vazio', async () => {
        const productAll = await productsModel.getAll();
        expect(productAll).to.be.empty;
      });
    });
    describe('Se houver produtos cadastrados', () => {
      before(async () => {
        const execute = [ products ]
        sinon.stub(connection, 'execute').resolves(execute);
      });
      after(async () => {
        connection.execute.restore();
      });
      it('Retornará um array', async () => {
        const productAll = await productsModel.getAll();
        expect(productAll).to.be.an('array');
      });
      it('O array não deve estar vazio', async () => {
        const productAll = await productsModel.getAll();
        expect(productAll).to.be.not.empty;
      });
      it('Os elementos possuem as propiedades "id", "name", "quantity"', async () => {
        const productAll = await productsModel.getAll();
        expect(productAll[0]).to.be.a.property('id');
        expect(productAll[0]).to.be.a.property('name');
        expect(productAll[0]).to.be.a.property('quantity');
      });
      it('Retorna um array de produtos', async () => {
        const result = {
          "id": 2,
          "name": "produto B",
          "quantity": 20
        };
        const productAll = await productsModel.getAll();
        expect(productAll.length).to.be.equal(2);
        expect(productAll[1]).to.be.deep.equal(result);
      });
    });
    describe('Ao retornar um erro', () => {
      const error = { error: true, codeStatus: 500, message: 'Internal Server Error' }
      before(async () => {
        sinon.stub(connection, 'execute').rejects(true);
      });
      after(async () => {
        connection.execute.restore();
      });
      it('Retorna a mensagem de erro', async () => {
        const newProduct = await productsModel.getAll();
        expect(newProduct).to.be.deep.equal(error);
      });
      it('Retorna um objeto de erro contendo as propriedades "error", "codeStatus" e "message"', async () => {
        const newProduct = await productsModel.getAll();
        expect(newProduct).to.be.a('object');
        expect(newProduct).to.have.property('error');
        expect(newProduct).to.have.property('codeStatus');
        expect(newProduct).to.have.property('message');
      });
    });
  });
  describe('Testa getByName', () => {
    describe('Se for passado um objeto com o "name" vazio', () => {
      before(async () => {
        const execute = [[], [{}], [{}] ]
        sinon.stub(connection, 'execute').resolves(execute);
      });
      after(async () => {
        connection.execute.restore();
      });
      it('Retornará um array', async () => {
        const name = await productsModel.getByName('qualquer');
        expect(name).to.be.a('array');
      });
      it('Retornará um array vazio', async () => {
        const name = await productsModel.getByName('qualquer');
        expect(name).to.be.empty;
      });
    });
    describe('Se "name" for passado corretamente', () => {
      before(async () => {
        const execute = [
          {
            "id": 1,
            "name": "produto A",
            "quantity": 10
          }
        ];
        sinon.stub(connection, 'execute').resolves(execute);
      });
      after(async () => {
        connection.execute.restore();
      });
      it('Retornará um objeto', async () => {
        const name = await productsModel.getByName('produto A');
        expect(name).to.be.an('object');
      });
      it('Verifica se o objeto não está vazio', async () => {
        const name = await productsModel.getByName('produto A');
        expect(name).to.be.not.empty;
      });
      it('Verifica se o produto possui as propiedades "id", "name", "quantity"', async () => {
        const name = await productsModel.getByName('produto A');
        expect(name).to.be.a.property('id');
        expect(name).to.be.a.property('name');
        expect(name).to.be.a.property('quantity');
      });
      it('Retorna um objeto com o produto', async () => {
        const result = {
          "id": 1,
          "name": "produto A",
          "quantity": 10
        };
        const name = await productsModel.getByName('produto A');
        expect(name).to.be.deep.equal(result);
      });
    });
    describe('Ao retornar um erro', () => {
      const error = { error: true, codeStatus: 500, message: 'Internal Server Error' }
      before(async () => {
        sinon.stub(connection, 'execute').rejects(true);
      });
      after(async () => {
        connection.execute.restore();
      });
      it('Retorna a mensagem de erro', async () => {
        const name = await productsModel.getByName('produto A');
        expect(name).to.be.deep.equal(error);
      });
      it('Retorna um objeto contendo as propriedades "error", "codeStatus" e "message"', async () => {
        const name = await productsModel.getByName('produto A');
        expect(name).to.be.a('object');
        expect(name).to.have.property('error');
        expect(name).to.have.property('codeStatus');
        expect(name).to.have.property('message');
      });
    });
  });
  describe('Testa getById', () => {
    describe('Se o "id" estiver vazio', () => {
      before(async () => {
        const execute = [[], [{}], [{}] ]
        sinon.stub(connection, 'execute').resolves(execute);
      });
      after(async () => {
        connection.execute.restore();
      });
      it('Retornará um array', async () => {
        const productId = await productsModel.getById(30);
        expect(productId).to.be.a('array');
      });
      it('Retornará um array vazio', async () => {
        const productId = await productsModel.getById(30);
        expect(productId).to.be.empty;
      });
    });
    describe('Se o "id" for passado corretamente', () => {
      before(async () => {
        const execute = [
          {
            "id": 2,
            "name": "produto B",
            "quantity": 20
          }
        ];
        sinon.stub(connection, 'execute').resolves(execute);
      });
      after(async () => {
        connection.execute.restore();
      });
      it('Ao retornar um objeto', async () => {
        const productId = await productsModel.getById(2);
        expect(productId).to.be.an('object');
      });
      it('Objeto vazio', async () => {
        const productId = await productsModel.getById(2);
        expect(productId).to.be.not.empty;
      });
      it('Se o produto possui as propriedades "id", "name", "quantity"', async () => {
        const productId = await productsModel.getById(2);
        expect(productId).to.be.a.property('id');
        expect(productId).to.be.a.property('name');
        expect(productId).to.be.a.property('quantity');
      });
      it('Retorna o produto em um objeto', async () => {
        const result = {
          "id": 2,
          "name": "produto B",
          "quantity": 20
        };
        const productId = await productsModel.getById(2);
        expect(productId).to.be.deep.equal(result);
      });
    });
    describe('Ao retornar um erro', () => {
      const error = { error: true, codeStatus: 500, message: 'Internal Server Error' }
      before(async () => {
        sinon.stub(connection, 'execute').rejects(true);
      });
      after(async () => {
        connection.execute.restore();
      });
      it('Retorna a mensagem de erro', async () => {
        const name = await productsModel.getById(1);
        expect(name).to.be.deep.equal(error);
      });
      it('Retorna o objeto contendo as propriedades "error", "codeStatus" e "message"', async () => {
        const name = await productsModel.getById(1);
        expect(name).to.be.a('object');
        expect(name).to.have.property('error');
        expect(name).to.have.property('codeStatus');
        expect(name).to.have.property('message');
      });
    });
  });

  describe('Testa updateProduct', () => {
    const productQuantity = {
      id: 1,
      name: "produto alterado",
      quantity: 5
    };
    describe('Ao atualizar um produto com sucesso', () => {
      before(async () => {
        const execute = [{ insertId: 1 }]
        sinon.stub(connection, 'execute').resolves(execute);
      });
      after(async () => {
        connection.execute.restore();
      });
      it('Retorna um objeto', async () => {
        const updatedProduct = await productsModel.updateProduct(productQuantity);
        expect(updatedProduct).to.be.a('object');
      });
      it('O objeto contém as propriedades "id", "name" e "quantity"', async () => {
        const updatedProduct = await productsModel.updateProduct(productQuantity);
        expect(updatedProduct).to.have.a.property('id');
        expect(updatedProduct).to.have.a.property('name');
        expect(updatedProduct).to.have.a.property('quantity');
      });
      it('Retorna o objeto esperado', async () => {
        const result = { "id": 1, "name": "produto alterado", "quantity": 5 };
        const updatedProduct = await productsModel.updateProduct(productQuantity);
        expect(updatedProduct).to.be.deep.equal(result);
      });
    });
    describe('Ao retornar um erro', () => {
      const error = { error: true, codeStatus: 500, message: 'Internal Server Error' }
      before(async () => {
        sinon.stub(connection, 'execute').rejects(true);
      });
      after(async () => {
        connection.execute.restore();
      });
      it('Retorna a mensagem de erro', async () => {
        const updatedProduct = await productsModel.updateProduct(productQuantity);
        expect(updatedProduct).to.be.deep.equal(error);
      });
      it('A mensagem possui as propriedades "error", "codeStatus" e "message"', async () => {
        const updatedProduct = await productsModel.insertProduct(productQuantity);
        expect(updatedProduct).to.be.a('object');
        expect(updatedProduct).to.have.property('error');
        expect(updatedProduct).to.have.property('codeStatus');
        expect(updatedProduct).to.have.property('message');
      });
    });
  });
  describe('Testa deleteById', () => {
    const id = 1;
    const product = [{ insertId: 1 }]
    describe('Ao deletar um produto com sucesso', () => {
      before(async () => {
        const execute = product
        sinon.stub(connection, 'execute').resolves(execute);
      });
      after(async () => {
        connection.execute.restore();
      });
      it('Retorna um objeto', async () => {
        const deletedProduct = await productsModel.deleteById(id);
        expect(deletedProduct).to.be.a('object');
      });
      it('O objeto possui as propriedades "id", "name" e "quantity"', async () => {
        const deletedProduct = await productsModel.deleteById(id);
        expect(deletedProduct).to.have.a.property('id');
      });
      it('O objeto foi retornado corretamente', async () => {
        const deletedProduct = await productsModel.deleteById(id);
        expect(deletedProduct).to.be.deep.equal({id: 1});
      });
    });
    describe('Ao retornar um erro', () => {
      const error = { error: true, codeStatus: 500, message: 'Internal Server Error' }
      before(async () => {
        sinon.stub(connection, 'execute').rejects(true);
      });
      after(async () => {
        connection.execute.restore();
      });
      it('Retorna a mensagem de erro', async () => {
        const deletedProduct = await productsModel.deleteById(id);
        expect(deletedProduct).to.be.deep.equal(error);
      });
      it('A mensagem possui as propriedades "error", "codeStatus" e "message"', async () => {
        const deletedProduct = await productsModel.deleteById(id);
        expect(deletedProduct).to.be.a('object');
        expect(deletedProduct).to.have.property('error');
        expect(deletedProduct).to.have.property('codeStatus');
        expect(deletedProduct).to.have.property('message');
      });
    });
  });
});

describe('Testa salesModel', () => {
  describe('Testa newSale', () => {
    describe('Ao retornar um erro', () => {
      const error = { error: true, codeStatus: 500, message: 'Internal Server Error' }
      before(async () => {
        sinon.stub(connection, 'execute').rejects(true);
      });
      after(async () => {
        connection.execute.restore();
      });
      it('Retorna a mensagem de erro', async () => {
        const newSale = await salesModel.newSale();
        expect(newSale).to.be.deep.equal(error);
      });
      it('A mensagem possui as propriedades "error", "codeStatus" e "message"', async () => {
        const newSale = await salesModel.newSale();
        expect(newSale).to.be.a('object');
        expect(newSale).to.have.property('error');
        expect(newSale).to.have.property('codeStatus');
        expect(newSale).to.have.property('message');
      });
    });
  });
  describe('Testa saleID', () => {
    describe('Ao retornar um erro', () => {
      const error = { error: true, codeStatus: 500, message: 'Internal Server Error' }
      before(async () => {
        sinon.stub(connection, 'execute').rejects(true);
      });
      after(async () => {
        connection.execute.restore();
      });
      it('Retorna a mensagem de erro', async () => {
        const id = await salesModel.saleID();
        expect(id).to.be.deep.equal(error);
      });
      it('A mensagem possui as propriedades "error", "codeStatus" e "message"', async () => {
        const id = await salesModel.saleID();
        expect(id).to.be.a('object');
        expect(id).to.have.property('error');
        expect(id).to.have.property('codeStatus');
        expect(id).to.have.property('message');
      });
    });
  });
  describe('Testa getProductQuantity', () => {
    describe('Ao retornar um erro', () => {
      const error = { error: true, codeStatus: 500, message: 'Internal Server Error' }
      before(async () => {
        sinon.stub(connection, 'execute').rejects(true);
      });
      after(async () => {
        connection.execute.restore();
      });
      it('Retorna a mensagem de erro', async () => {
        const id = await salesModel.getProductQuantity();
        expect(id).to.be.deep.equal(error);
      });
      it('A mensagem possui as propriedades "error", "codeStatus" e "message"', async () => {
        const id = await salesModel.getProductQuantity();
        expect(id).to.be.a('object');
        expect(id).to.have.property('error');
        expect(id).to.have.property('codeStatus');
        expect(id).to.have.property('message');
      });
    });
  });
});
