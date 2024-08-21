import { ArmorData, pieceType } from "./armorData";

export class ArmorSet {

  private _armorSet: Map<string, ArmorData>;

  constructor(armorSet: Map<string, ArmorData>) {
    this._armorSet = armorSet;
  }

  public getPart(part: pieceType): ArmorData | null {
    return this._armorSet.get(part) || null;
  }

  public getName(part: pieceType): string {
    return this._armorSet.get(part)?.name || '';
  }

  public getSkills(part: pieceType): string {
    return this._armorSet.get(part)?.skills || '';
  }

  public getMaterials(part: pieceType): string {
    return this._armorSet.get(part)?.materials || '';
  }

  public getSlots(part: pieceType): number {
    return this._armorSet.get(part)?.slots || 0;
  }

  public getClass(part: pieceType): number {

    return this._armorSet.get(part)?.class || 0;
  }

  public getRare(part: pieceType): number {
    return this._armorSet.get(part)?.rare || 1;
  }

  public getDefense(part: pieceType): number {
    return this._armorSet.get(part)?.defense || 0;
  }

  public getFireRes(part: pieceType): number {
    return this._armorSet.get(part)?.fire_res || 0;
  }

  public getWaterRes(part: pieceType): number {
    return this._armorSet.get(part)?.water_res || 0;
  }

  public getThunderRes(part: pieceType): number {
    return this._armorSet.get(part)?.thunder_res || 0;
  }

  public getIceRes(part: pieceType): number {
    return this._armorSet.get(part)?.ice_res || 0;
  }

  public getDragonRes(part: pieceType): number {
    return this._armorSet.get(part)?.dragon_res || 0;
  }

  public getTotalDefense() {
    return (
      this.getDefense(pieceType.helmet) +
      this.getDefense(pieceType.plate) +
      this.getDefense(pieceType.guantlets) +
      this.getDefense(pieceType.waist) +
      this.getDefense(pieceType.leggings)
    );
  }

  public getTotalFireRes(): number {
    return (
      this.getFireRes(pieceType.helmet) +
      this.getFireRes(pieceType.plate) +
      this.getFireRes(pieceType.guantlets) +
      this.getFireRes(pieceType.waist) +
      this.getFireRes(pieceType.leggings)
    );
  }

  public getTotalWaterRes(): number {
    return (
      this.getWaterRes(pieceType.helmet) +
      this.getWaterRes(pieceType.plate) +
      this.getWaterRes(pieceType.guantlets) +
      this.getWaterRes(pieceType.waist) +
      this.getWaterRes(pieceType.leggings)
    );
  }

  public getTotalThunderRes(): number {
    return (
      this.getThunderRes(pieceType.helmet) +
      this.getThunderRes(pieceType.plate) +
      this.getThunderRes(pieceType.guantlets) +
      this.getThunderRes(pieceType.waist) +
      this.getThunderRes(pieceType.leggings)
    );
  }

  public getTotalIceRes(): number {
    return (
      this.getIceRes(pieceType.helmet) +
      this.getIceRes(pieceType.plate) +
      this.getIceRes(pieceType.guantlets) +
      this.getIceRes(pieceType.waist) +
      this.getIceRes(pieceType.leggings)
    );
  }

  public getTotalDragonRes(): number {
    return (
      this.getDragonRes(pieceType.helmet) +
      this.getDragonRes(pieceType.plate) +
      this.getDragonRes(pieceType.guantlets) +
      this.getDragonRes(pieceType.waist) +
      this.getDragonRes(pieceType.leggings)
    );
  }

  public getTotalSlots(): number {
    return (
      this.getSlots(pieceType.helmet) +
      this.getSlots(pieceType.plate) +
      this.getSlots(pieceType.guantlets) +
      this.getSlots(pieceType.waist) +
      this.getSlots(pieceType.leggings)
    );
  }

  get equipedParts(): string[] {
    let parts: string[] = [];
    for (let key of this._armorSet.keys()) {
      parts.push(key);
    }

    return parts;
  }
}
