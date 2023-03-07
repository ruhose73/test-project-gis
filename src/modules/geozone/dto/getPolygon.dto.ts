export class GetPolygonDto {
    title: string;
    polygon: {
        type: string,
        coordinates:number[][][]
    }
    id: string
    createDateTime: Date
    lastChangedDateTime: Date
}