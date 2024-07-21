import { Injectable } from '@angular/core';
import {ArmorData} from '../types/armorData';
import { Dictionary } from '../types/dictionary';


@Injectable({
  providedIn: 'root'
})
export class ArmorDataAccessService {

  private armorApiUrl: string = "http://localhost:5150/api/armor";

  constructor() {}

  public async getArmorData(type: string = "helmets", rare: string = "", defense: string = "",
    minRare: string = "", minDefense: string = ""): Promise<ArmorData[]> {

    // let queryParameters = "";
    // Create URL for Query
    // if(rare != "") {queryParameters.concat(`rare=${rare}`)}
    /* queryParameters = rare != "" ? queryParameters.concat(`rare=${rare}`) : queryParameters;
    queryParameters = defense != "" ? queryParameters.concat(`defense=${defense}`) : queryParameters;
    queryParameters = minRare != "" ? queryParameters.concat(`minRare=${minRare}`) : queryParameters;
    queryParameters = minDefense != "" ? queryParameters.concat(`rare=${minDefense}`) : queryParameters;
    queryParameters = queryParameters != "" ? `?${queryParameters}` : ""; */
    const queryParams: any = {};

    if (rare) queryParams.rare = rare;
    if (defense) queryParams.defense = defense;
    if (minRare) queryParams.minRare = minRare;
    if (minDefense) queryParams.minDefense = minDefense;

    const queryString = new URLSearchParams(queryParams).toString();
    const url = `${this.armorApiUrl}/${type}${queryString ? '?' + queryString : ''}`;

    try {

      const data = await fetch(url);
      // console.log("Data recived: ");
      // "Response OK?: " + data.ok);
      // console.log(await data.json());
      return await data.json() ?? [];

    } catch (error) {
      console.log("Error while consulting armor api.");
      console.log(error);
      return [];
    }
  }

  

}

