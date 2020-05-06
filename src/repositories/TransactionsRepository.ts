import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}
interface CreteTransitionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const { income, outcome } = this.transactions.reduce(
      (acomulator: Balance, transaction: Transaction) => {
        switch (transaction.type) {
          case 'income':
            acomulator.income += transaction.value;
            break;
          case 'outcome':
            acomulator.outcome += transaction.value;
            break;
          default:
            break;
        }
        return acomulator;
      },
      {
        income: 0,
        outcome: 0,
        total: 0,
      },
    );
    const total = income - outcome;
    return { income, outcome, total };
  }

  public create({ title, value, type }: CreteTransitionDTO): Transaction {
    const transition = new Transaction({
      title,
      value,
      type,
    });
    this.transactions.push(transition);
    return transition;
  }
}

export default TransactionsRepository;
