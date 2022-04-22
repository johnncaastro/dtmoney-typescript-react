import { createRoot } from 'react-dom/client';
import { createServer, Model } from 'miragejs'
import { App } from './App';

createServer({
  models: {
    transaction: Model,
  },

  seeds(server) {
    server.db.loadData({
      transactions: [
        {
          id: 1,
          title: 'Freelancer de Website',
          type: 'deposit',
          category: 'dev',
          amount: 6000,
          createdAt: new Date('2022-04-10 16:40:00')
        },
        {
          id: 2,
          title: 'Energia',
          type: 'withdraw',
          category: 'consumo',
          amount: 180,
          createdAt: new Date('2022-04-14 08:40:00')
        }
      ]
    })
  },

  routes() {
    this.namespace = 'api';

    this.get('/transactions', () => {
      return this.schema.all('transaction');
    })

    this.post('transactions', (schema, request) => {
      const data = JSON.parse(request.requestBody)

      return schema.create('transaction', data);
    })
  }
})

const container = document.getElementById('root');
const root = createRoot(container!);

root.render(<App />);
