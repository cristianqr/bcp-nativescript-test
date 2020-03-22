import { Injectable } from "@angular/core";
import { Money } from "../shared/entities/money.entity";
import * as appSettings from "tns-core-modules/application-settings";

@Injectable()
export class MoneyExchangeRepository {
    private moneys: Money[];
    constructor() {
        appSettings.clear();
        this.moneys = [
            {
                countryName: "European Union",
                code: "EUR",
                label: "Euros",
                flag: "european-union.png",
                euroEquivalentAmount: 1
            },
            {
                countryName: "United States",
                code: "USD",
                label: "Dólares",
                flag: "united-states.jpg",
                euroEquivalentAmount: 1.0963
            },
            {
                countryName: "Japan",
                code: "JPN",
                label: "Yenes",
                flag: "japan.jpg",
                euroEquivalentAmount: 118.02
            },
            {
                countryName: "United Kingdom",
                code: "GBP",
                label: "Libras",
                flag: "united-kingdom.jpg",
                euroEquivalentAmount: 0.8866
            },
            {
                countryName: "Switzerland",
                code: "CHF",
                label: "Francos",
                flag: "switzerland.jpg",
                euroEquivalentAmount: 1.0836
            },
            {
                countryName: "Canada",
                code: "CAD",
                label: "canadienses",
                flag: "canada.jpg",
                euroEquivalentAmount: 1.4565
            },
            {
                countryName: "Perú",
                code: "PEN",
                label: "Soles",
                flag: "peru.jpg",
                euroEquivalentAmount: 4
            }
        ];
    }
    getMoneys(): Money[] {
        return this.moneys;
    }
    getCurrentChangeMoney(): Money {
        return JSON.parse(appSettings.getString("currentChangeMoney"));
    }

    getOriginMoney(): Money {
        if (this.existData("originMoney")) {
            return JSON.parse(appSettings.getString("originMoney"));
        } else {
            return this.moneys.find(item => item.code === "PEN");
        }
    }

    getDestinationMoney(): Money {
        if (this.existData("destinationMoney")) {
            return JSON.parse(appSettings.getString("destinationMoney"));
        } else {
            return this.moneys.find(item => item.code === "USD");
        }
    }

    setOriginMoney(money: Money) {
        appSettings.setString("originMoney", JSON.stringify(money));
    }

    setDestinationMoney(money: Money) {
        appSettings.setString("destinationMoney", JSON.stringify(money));
    }

    setCurrentChangeMoney(money: Money) {
        appSettings.setString("currentChangeMoney", JSON.stringify(money));
    }

    private existData(dataKey: string): boolean {
        return appSettings.getString(dataKey) ? true : false;
    }
}
