import { useEffect, useState } from "react"
import axios from "axios"
import "./Form.css"

const Form = () => {
	const [input_amount, SetInputAmount] = useState(0)
	const [input_currency, SetInputCurrency] = useState("bitcoin")
	const [output_amount, SetOutputAmount] = useState(0)
	const [output_currency, SetOutputCurrency] = useState("ethereum")
	const [exchange_rate, SetExchangeRate] = useState(0)

	const token_icons = {
		bitcoin: "/tokens/bitcoin.svg",
		ethereum: "/tokens/ethereum.svg",
		litecoin: "/tokens/litecoin.svg"
	}

	useEffect(() => {
		FetchExchangedRate(input_currency, output_currency)
	})

	const FetchExchangedRate = async (from_currency, to_currency) => {
		try {
			const response = await axios.get(
				`https://api.coingecko.com/api/v3/simple/price?ids=${from_currency},${to_currency}&vs_currencies=eur`
			)

			const from_price_in_eur = response.data[from_currency]?.eur
			const to_price_in_eur = response.data[to_currency]?.eur

			if (from_price_in_eur && to_price_in_eur) {
				const rate = from_price_in_eur / to_price_in_eur

				SetExchangeRate(rate)

				CalculateOutputAmount(input_amount, rate)
			}
			else {
				console.log("Error")
				SetOutputAmount(0)
			}

		}
		catch (error) {
			console.log("Error: ", error)
			SetOutputAmount(0)
		}
	}

	const CalculateOutputAmount = (amount, rate) => {
		SetOutputAmount(amount * rate)
	}

	const HandleSubmit = (event) => {
		event.preventDefault()
		console.log({ input_amount, input_currency, output_amount, output_currency })
	}

	const HandleInputAmount = (event) => {
		const amount = event.target.value
		SetInputAmount(amount)
		CalculateOutputAmount(amount, exchange_rate)
	}

	const HandleInputCurrency = (event) => {
		const currency = event.target.value
		SetInputCurrency(currency)
	}

	const HandleOutputCurrency = (event) => {
		const currency = event.target.value
		SetOutputCurrency(currency)
	}

	return (
		<form className="currency-swap-form" onSubmit={HandleSubmit}>
			<h5 className="form-title">Currency Swap</h5>

			<div className="form-group">
				<label htmlFor="input-amount">Amount to send</label>
				<input
					className="number-input"
					type="number"
					id="input-amount"
					value={input_amount}
					onChange={HandleInputAmount}
					required
				/>
			</div>

			<div className="form-group">
				<label htmlFor="input-currency">Currency</label>
				<select
					id="input-currency"
					value={input_currency}
					onChange={HandleInputCurrency}
				>
					<option value="bitcoin">
						<img src={token_icons.bitcoin} alt="Bitcoin" className="token-icon" />
						Bitcoin (BTC)
					</option>
					<option value="ethereum">
						<img src={token_icons.ethereum} alt="Ethereum" className="token-icon" />
						Ethereum (ETH)
					</option>
					<option value="litecoin">
						<img src={token_icons.litecoin} alt="Litecoin" className="token-icon" />
						Litecoin (LTC)
					</option>
				</select>
			</div>

			<div className="form-group">
				<label htmlFor="output-amount">Amount to receive</label>
				<input
					className="number-input"
					id="output-amount"
					value={output_amount}
					readOnly
				/>
			</div>

			<div className="form-group">
				<label htmlFor="output-currency">Currency</label>
				<select
					id="output-currency"
					value={output_currency}
					onChange={HandleOutputCurrency}
				>
					<option value="bitcoin">
						<img src={token_icons.bitcoin} alt="Bitcoin" className="token-icon" />
						Bitcoin (BTC)
					</option>
					<option value="ethereum">
						<img src={token_icons.ethereum} alt="Ethereum" className="token-icon" />
						Ethereum (ETH)
					</option>
					<option value="litecoin">
						<img src={token_icons.litecoin} alt="Litecoin" className="token-icon" />
						Litecoin (LTC)
					</option>
				</select>
			</div>

			<button className="swap-button" type="submit">CONFIRM SWAP</button>
		</form>
	)
}

export default Form
