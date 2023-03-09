import { PaginationDto } from '../dto';

export const getPolygonsSql = (paginationDto: PaginationDto) => `
SELECT json_build_object(
        'id',"id",
        'title',"title",
        'polygon',ST_AsGeoJSON("polygon")::jsonb
)
FROM public."Geozone"
LIMIT ${paginationDto.limit}
OFFSET ${paginationDto.offset}
;`;
