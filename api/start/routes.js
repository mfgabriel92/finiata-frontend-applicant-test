'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.0/routing
|
*/

const Route = use('Route');

Route.group(() => {
  Route.post("/invoices", "InvoiceController.store");
  Route.post("/invoices-info/:invoiceId", "InvoiceInfoController.store");
  Route.get("/recipients/:invoiceId", "RecipientController.fetch");
  Route.post("/recipients/:invoiceId", "RecipientController.store");
  Route.put("/recipients/:id", "RecipientController.store");
  Route.get("/invoices/:invoiceId/additional-files", "AdditionalFileController.fetch");
  Route.post("/invoices/:invoiceId/additional-files", "AdditionalFileController.store");
  Route.delete("/invoices/:invoiceId/additional-files/:id", "AdditionalFileController.destroy");
}).prefix('api/v1');