import { Format } from "../emums";

export class CreatePolygonDto {
    title: string;
    polygon: number[][][]
    format?: Format
}