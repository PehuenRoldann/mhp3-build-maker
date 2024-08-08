export class ArmorData {

    public name: string = "";
    public rare: number = 1;
    public defense: number = 0;
    public slots: number = 0;
    public fire_res: number = 0;
    public water_res: number = 0;
    public thunder_res:number = 0;
    public ice_res: number = 0;
    public dragon_res: number = 0;
    public class: number = 0;
    public skills: string = "";
    public materials: string = "";
    
};

export enum piecesTypes {
    helmets = "helmets",
    plates = "plates",
    guantlets = "guantlets",
    waists = "waists",
    leggings = "leggings"
}

export enum pieceType {
    helmet = "helmet",
    plate = "plate",
    guantlets = "guantlets",
    waist = "waist",
    leggings = "leggings"
}