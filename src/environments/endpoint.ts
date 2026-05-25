import { environment } from "./environment";

const ws = {
  me: window.location.origin,
  ws_campomesa: environment.urls.ws_campomesa.host + ':' + environment.urls.ws_campomesa.port + environment.urls.ws_campomesa.prefix,
};

export const endpoint = {
  campomesa: {
    empty: ws.ws_campomesa + '/',
    dashboard: ws.ws_campomesa + '/dashboard',
    pedidos: ws.ws_campomesa + '/pedidos',
    productos: ws.ws_campomesa + '/productos',
  },
  current: {
    images: ws.me + '/assets/images/siapp'
  },
  redirectLogin: environment.redirect,
};
