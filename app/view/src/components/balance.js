import React from "react";
import { BalanceStyle } from "../styles/BalanceStyle";

function Balance(){
    const balance = "5.000,00"
    return(
        <BalanceStyle>
            <h1>Account balance</h1>
            <p>R$ {balance}</p>
            <div class="actions_balance">
                <button>Withdrawal</button>
                <button>Deposit</button>
            </div>
        </BalanceStyle>
    )
}


export default Balance