import { Component, OnInit } from "@angular/core";
import { Money } from "../../shared/entities/money.entity";
import { MoneyExchangeRepository } from "../../repositories/money-exchange.repository";
import { RouterExtensions } from "nativescript-angular/router";
import { Page } from "tns-core-modules/ui/page/page";

@Component({
    selector: "bcp-money-view",
    templateUrl: "./money-view.component.html",
    styleUrls: ["./money-view.component.css"]
})
export class MoneyViewComponent implements OnInit {
    items: Money[];
    currentChangeMoney: Money;
    originMoney: Money;
    destinationMoney: Money;
    constructor(
        private moneyExchangeRepository: MoneyExchangeRepository,
        private router: RouterExtensions,
        private page: Page
    ) {
        this.page.actionBarHidden = true;
    }

    ngOnInit() {
        this.items = this.moneyExchangeRepository.getMoneys();
        this.currentChangeMoney = this.moneyExchangeRepository.getCurrentChangeMoney();
        this.originMoney = this.moneyExchangeRepository.getOriginMoney();
        this.destinationMoney = this.moneyExchangeRepository.getDestinationMoney();
    }

    selectItem(item: Money) {
        item.amount = this.currentChangeMoney.amount;
        if (this.currentChangeMoney.code === this.originMoney.code) {
            this.moneyExchangeRepository.setOriginMoney(item);
        } else {
            this.moneyExchangeRepository.setDestinationMoney(item);
        }

        this.router.navigate(["/exchange"]);
    }

    get filteredItems() {
        return this.items.filter(item => item.code !== this.noChangeMoneyCode);
    }

    get noChangeMoneyCode() {
        if (this.currentChangeMoney.code === this.originMoney.code) {
            return this.destinationMoney.code;
        }

        return this.originMoney.code;
    }
}
