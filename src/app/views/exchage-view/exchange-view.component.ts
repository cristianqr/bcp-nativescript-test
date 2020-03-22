import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { Money } from "../../shared/entities/money.entity";
import { MoneyExchangeRepository } from "~/app/repositories";
import { Page } from "tns-core-modules/ui/page/page";

@Component({
    selector: "bcp-exchange-view",
    templateUrl: "./exchange-view.component.html",
    styleUrls: ["./exchange-view.component.css"]
})
export class ExchangeViewComponent implements OnInit {
    originMoney: Money;
    destinationMoney: Money;

    constructor(
        private router: RouterExtensions,
        private moneyExchangeRepository: MoneyExchangeRepository,
        private page: Page
    ) {
        this.page.actionBarHidden = true;
    }

    ngOnInit() {
        this.originMoney = this.moneyExchangeRepository.getOriginMoney();
        this.destinationMoney = this.moneyExchangeRepository.getDestinationMoney();
    }
    public longPressOrigin() {
        this.saveAllData(this.originMoney);
        this.router.navigate(["/money"]);
    }

    public longPressDestination() {
        this.saveAllData(this.destinationMoney);

        this.router.navigate(["/money"]);
    }

    public changeMoney() {
        this.destinationMoney.amount = this.originMoney.amount;
        [this.originMoney, this.destinationMoney] = [
            this.destinationMoney,
            this.originMoney
        ];
        this.moneyExchangeRepository.setOriginMoney(this.originMoney);
        this.moneyExchangeRepository.setDestinationMoney(this.destinationMoney);
    }

    private saveAllData(currentChangeMoney: Money) {
        this.moneyExchangeRepository.setCurrentChangeMoney(currentChangeMoney);
        this.moneyExchangeRepository.setOriginMoney(this.originMoney);
        this.moneyExchangeRepository.setDestinationMoney(this.destinationMoney);
    }

    get destinationAmount() {
        return Number(
            (this.originMoney.amount / this.originMoney.euroEquivalentAmount) *
                this.destinationMoney.euroEquivalentAmount
        ).toFixed(2);
    }
}
