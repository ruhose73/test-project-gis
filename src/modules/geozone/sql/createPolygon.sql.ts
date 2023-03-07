export const createPolygonSql = (title:string,linestring:string) => `
INSERT INTO public."Geozone" (title, polygon) 
 SELECT '${title}', ST_GeomFromText('POLYGON((${linestring}))', 4326)
 WHERE NOT EXISTS (
    SELECT null FROM public."Geozone"
    WHERE (title) = ('${title}')
 ) RETURNING id
;`
