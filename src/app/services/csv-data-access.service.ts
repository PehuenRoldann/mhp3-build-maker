import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, materialize, NotFoundError, Observable } from 'rxjs';
import { ArmorData } from '../types/armorData';
import { raw } from 'express';
import { __values } from 'tslib';
import { ArrayOptions } from 'stream';


@Injectable({
  providedIn: 'root'
})
export class CsvDataAccessService {

  constructor(private http: HttpClient) { }

  public async getArmorData(partsType: string): Promise<ArmorData[]> {

    if (!['helmets','plates','guantlets','waists','leggings'].includes(partsType)) {

      console.log("Not valid part selected to list.");
      throw new Error();
    }

    let data =  await firstValueFrom(this.loadCSV(partsType));
    
    return this.parseArmorDataArray(data);
  }

  private loadCSV(partsType: string): Observable<string> {
  
    const csvUrl = `/assets/csv/armor_dataset_${partsType}.csv`; // Csv with the armor data

    try{
      return this.http.get(csvUrl, { responseType: 'text' });
    }
    catch (error: any) {
      console.log("Error:  " + error);
      throw(error);
    }

    
  }

  private parseArmorDataArray (rawData: string): ArmorData[] {

    
    let splitedData = rawData.split("\r\n");
    let headers = splitedData[0].split(";");
    // console.log(headers); Debug

    if (splitedData.at(splitedData.length-1) === "") {
      splitedData.pop();
    }

    splitedData = splitedData.splice(1, splitedData.length - 1);
    // console.log(splitedData); Debug

    let dataMatrix: Array<Array<string>> = [];

    splitedData.forEach(dataRow => {
      
      dataMatrix.push(dataRow.split(';'));
    });

    // console.log(dataMatrix!); Debug

    // let propertiesNamesArr = Object.getOwnPropertyNames(new ArmorData()); Debug

    let armorDataArr: Array<ArmorData> = [];

    for (let row = 0; row < splitedData.length; row++) {

      let armorData = new ArmorData();

      for (let colum = 0; colum < headers.length; colum++) {

        switch (headers[colum].toLowerCase()) {
          case 'name':
            armorData.name = dataMatrix[row][colum];
            break;
          case 'rare':
            armorData.rare = Number.parseInt(dataMatrix[row][colum]);
            break;
          case 'defense':
            armorData.defense = Number.parseInt(dataMatrix[row][colum]);
            break;
          case 'slots':
            armorData.slots = Number.parseInt(dataMatrix[row][colum]);
            break;
          case 'fire_res':
            armorData.fire_res = Number.parseInt(dataMatrix[row][colum]);
            break;
          case 'water_res':
            armorData.water_res = Number.parseInt(dataMatrix[row][colum]);
            break;
          case 'thunder_res':
            armorData.thunder_res = Number.parseInt(dataMatrix[row][colum]);
            break;
          case 'ice_res':
            armorData.ice_res = Number.parseInt(dataMatrix[row][colum]);
            break;
          case 'dragon_res':
            armorData.dragon_res = Number.parseInt(dataMatrix[row][colum]);
            break;
          case 'class':
            armorData.class = Number.parseInt(dataMatrix[row][colum]);
            break;
          case 'skills':
            armorData.skills = dataMatrix[row][colum];
            break;
          case 'materials':
            armorData.materials = dataMatrix[row][colum];
            break;
          default:
            console.warn(`Unknown header: ${headers[colum]}`);
            break;
        }
      }

      armorDataArr.push(armorData);
    }

    return armorDataArr;
  }



}
