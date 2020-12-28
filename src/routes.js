import { lazy } from 'react';

const Dashboard     = lazy(() => import('./views/dashboard/Dashboard'));

// Masters
const Category      = lazy(() => import('./views/masters/category/Category'));
const CategoryAdd   = lazy(() => import('./views/masters/category/Add'));
const CategoryEdit  = lazy(() => import('./views/masters/category/Edit'));

const Item          = lazy(() => import('./views/masters/item/Item'));
const ItemAdd       = lazy(() => import('./views/masters/item/Add'));
const ItemEdit      = lazy(() => import('./views/masters/item/Edit'));

const Table         = lazy(() => import('./views/masters/table/Table'));
const TableAdd      = lazy(() => import('./views/masters/table/Add'));
const TableEdit     = lazy(() => import('./views/masters/table/Edit'));

// Billing
const POSTable      = lazy(() => import('./views/postable/PosTable'));
const POS           = lazy(() => import('./views/pos/Pos'));
const PosPrint      = lazy(() => import('./views/posprint/PosPrint'));

// Invoice
const InvoiceList   = lazy(() => import('./views/invoice/List'));

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },

  // Masters routes
  { path: '/categories', name: 'Categories', component: Category },
  { path: '/category-add', name: 'Add Category', component: CategoryAdd },
  { path: '/category-edit/:id', name: 'Edit Category', component: CategoryEdit },

  { path: '/items', name: 'Items', component: Item },
  { path: '/item-add', name: 'Add Item', component: ItemAdd },
  { path: '/item-edit/:id', name: 'Edit Item', component: ItemEdit },

  { path: '/tables', name: 'Tables', component: Table },
  { path: '/table-add', name: 'Add Table', component: TableAdd },
  { path: '/table-edit/:id', name: 'Edit Table', component: TableEdit },

  // Billing routes
  { path: '/pos-tables', name: 'POS Tables', component: POSTable },
  { path: '/pos/:id', name: 'POS', component: POS },
  { path: '/pos-print/:id', name: 'POS Print', component: PosPrint },

  // Invoice routes
  { path: '/invoices', name: 'Invoices List', component: InvoiceList },

];

export default routes;
