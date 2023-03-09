import { checkCoordinatesInGeozonDto } from "../dto";

export const checkCoordinatesInGeozonSql = (geozoneId: string, coordinates: checkCoordinatesInGeozonDto) => `
SELECT ST_Intersects(
	(
		SELECT polygon FROM public."Geozone" WHERE "Geozone"."id" = '${geozoneId}'
	), 
	ST_GeomFromText('POINT(${coordinates.lng} ${coordinates.lat})', 4326)
);
`;