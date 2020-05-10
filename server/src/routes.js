import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import VendorController from './app/controllers/VendorController';
import PurchaseController from './app/controllers/PurchaseController';
import ProductController from './app/controllers/ProductController';
import GroupController from './app/controllers/GroupController';
import InventoryController from './app/controllers/InventoryController';
import ProductImageController from './app/controllers/ProductImageController';

import authMiddleware from './app/middlewares/auth';
import LatestsPurchasesController from './app/controllers/LatestsPurchasesController';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);
routes.get('/sessions', SessionController.index);

routes.use(authMiddleware);

routes.put('/users', UserController.update);

routes.post('/vendors', VendorController.store);
routes.put('/vendors', VendorController.update);
routes.get('/vendors', VendorController.index);
routes.get('/vendors/:id', VendorController.show);
routes.delete('/vendors/:id', VendorController.destroy);

routes.post('/groups', GroupController.store);
routes.put('/groups', GroupController.update);
routes.get('/groups', GroupController.index);
routes.get('/groups/:id', GroupController.show);
routes.delete('/groups/:id', GroupController.destroy);

routes.post('/products', ProductController.store);
routes.put('/products', ProductController.update);
routes.get('/products', ProductController.index);
routes.get('/products/:id', ProductController.show);
routes.delete('/products/:id', ProductController.destroy);

routes.post('/product-images', ProductImageController.store);

routes.post('/purchases', PurchaseController.store);
routes.put('/purchases', PurchaseController.update);
routes.get('/purchases', PurchaseController.index);
routes.get('/purchases/:id', PurchaseController.show);
routes.delete('/purchases/:id', PurchaseController.destroy);

routes.get('/latests-purchases', LatestsPurchasesController.index);

routes.get('/inventory/:vendorCode', InventoryController.show);
routes.post('/inventory', InventoryController.store);

export default routes;
