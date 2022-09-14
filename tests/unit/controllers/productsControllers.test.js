const { expect } = require('chai');
const sinon = require('sinon');
const { connection } = require('../../../src/models/connection');
const productModel = require('../../../src/models/productModel')
const productService = require('../../../src/services/productService')
const productController = require('../../../src/controllers/productController')
const { getAll, getById, create, update, remove } = require('../mocks/products.mock')

describe('Teste de unidade da camada Controller', function () {
  describe('ProductController', function () {
    afterEach(sinon.restore);

    it('Verifica getAll', async function () {
      sinon.stub(connection, 'execute').resolves([getAll]);
      const req = {};
      const res = {};
      
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await productController.getAll(req, res);

      expect(res.json.calledWith(getAll)).to.be.true;
    })

    it('Verifica getById', async function () {
      sinon.stub(connection, 'execute').resolves([[getById]]);
      const req = {};
      const res = {};

      req.params = { id: 1 };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await productController.getById(req, res);

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith(getById)).to.be.true;
    })

    it('Verifica create', async function () {
      sinon.stub(connection, 'execute').resolves([{ insertId: 4 }]);
      const req = {};
      const res = {};

      req.body = { name: "Martelo do Batman" }
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await productController.create(req, res)
      
      expect(res.status.calledWith(201)).to.be.true;
      expect(res.json.calledWith(create)).to.be.true;
    })

    it('Verifica update', async function () {
      sinon.stub(connection, 'execute');
      sinon.stub(productService, 'getById').resolves([update])
      sinon.stub(productService, 'update').resolves([update])
      const req = {};
      const res = {};

      req.params = { id: 4 };
      req.body = {name: 'Force Staff'}
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await productController.update(req, res)
      const product = await productService.getById(4)
      const [productUpdated] = await productService.update({ id: 4, name: 'Force Staff' })

      expect(product).to.exist;
      expect(productUpdated).to.be.deep.equal(update);
    })

    it('Verifica remove', async function () {
      sinon.stub(connection, 'execute');
      sinon.stub(productService, 'getAll').resolves([remove])
      sinon.stub(productService, 'getById').resolves([{ id: 1, name: "Martelo de Thor" }])

      const req = {};
      const res = {};

      req.params = { id: 1 };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      res.send = sinon.stub().returns();

      const product = await productService.getById(1)

      expect(product).to.exist;
      
      await productController.remove(req, res)
      const [products] = await productService.getAll()

      expect(products).to.be.deep.equal(remove);
    })

  })
})