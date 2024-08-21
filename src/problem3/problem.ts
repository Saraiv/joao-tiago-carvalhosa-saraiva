interface WalletBalance {
    currency: string;
    amount: number;
    blockchain: string; // Added missing property
}

interface FormattedWalletBalance {
    currency: string;
    amount: number;
    formatted: string;
}

interface Props extends BoxProps { }

const WalletPage: React.FC<Props> = (props: Props) => {
    const { children, ...rest } = props;
    const balances = useWalletBalances();
    const prices = usePrices();

    const getPriority = (blockchain: string): number => {
        switch (blockchain) {
            case 'Osmosis':
                return 100;
            case 'Ethereum':
                return 50;
            case 'Arbitrum':
                return 30;
            case 'Zilliqa':
                return 20;
            case 'Neo':
                return 20;
            default:
                return -99;
        }
    };

    const sortedBalances = useMemo(() => {
        return balances
            .filter((balance) => balance.amount > 0) // Directly filter out negative balances
            .sort((lhs, rhs) => getPriority(rhs.blockchain) - getPriority(lhs.blockchain)) // Simplified sort
    }, [balances]) // Removed unnecessary var prices

    const formattedBalances = sortedBalances.map((balance) => ({
        ...balance,
        formatted: balance.amount.toFixed(2) // Added argument for decimal places as I don't need more
    }));

    const rows = formattedBalances.map((balance) => {
        const usdValue = prices[balance.currency] * balance.amount;
        return (
            <WalletRow 
                    className= { classes.row }
        key = { balance.currency + balance.amount } // Used unique combination of currency and amount as key
        amount = { balance.amount }
        usdValue = { usdValue }
        formattedAmount = { balance.formatted }
            />
        )
})

return (
    <div { ...rest } >
    { rows }
    </div>
)
}