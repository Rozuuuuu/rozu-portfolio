-- SugboWay Route Ingestion & Tracking Database Migration
-- Version: Phase 5/6 Compatible

-- 1. Verify schema adjustments
ALTER TABLE routes ADD COLUMN IF NOT EXISTS has_aircon BOOLEAN DEFAULT FALSE;

-- Update has_aircon flags
UPDATE routes SET has_aircon = FALSE WHERE route_code IN ('01B', '03B');
UPDATE routes SET has_aircon = TRUE WHERE route_code = '13C';

-- 2. Clean or seed route shapes
CREATE TABLE IF NOT EXISTS route_shapes (
  shape_id VARCHAR(50) PRIMARY KEY,
  geom GEOMETRY(LineString, 4326)
);

-- Seed Route 01B shape
INSERT INTO route_shapes (shape_id, geom)
VALUES (
  'shape_01b',
  ST_GeomFromGeoJSON('{
    "type": "LineString",
    "coordinates": [
      [123.8900, 10.3065], [123.8906, 10.3027], [123.8890, 10.3040], [123.8938, 10.2995],
      [123.8950, 10.2985], [123.8960, 10.2975], [123.8995, 10.2955], [123.9015, 10.2946],
      [123.9022, 10.2952], [123.9030, 10.2965], [123.9010, 10.2950], [123.9022, 10.2988],
      [123.9032, 10.2978], [123.9042, 10.2988], [123.9060, 10.3025], [123.9180, 10.3035],
      [123.9145, 10.3000], [123.9135, 10.2990], [123.9105, 10.2950], [123.9135, 10.2990],
      [123.9145, 10.3000], [123.9180, 10.3035], [123.9060, 10.3025], [123.9035, 10.2985],
      [123.9032, 10.2978], [123.8995, 10.2968], [123.9030, 10.2965], [123.8990, 10.2955],
      [123.8970, 10.2975], [123.8960, 10.2975], [123.8950, 10.2985], [123.8938, 10.2995],
      [123.8890, 10.3040], [123.8906, 10.3027], [123.8900, 10.3065]
    ]
  }')
)
ON CONFLICT (shape_id) DO UPDATE SET geom = EXCLUDED.geom;

-- Seed Route 03B shape
INSERT INTO route_shapes (shape_id, geom)
VALUES (
  'shape_03b',
  ST_GeomFromGeoJSON('{
    "type": "LineString",
    "coordinates": [
      [123.9140, 10.3250], [123.9125, 10.3230], [123.9118, 10.3225], [123.9100, 10.3168],
      [123.9080, 10.3108], [123.9020, 10.3115], [123.8985, 10.3135], [123.8962, 10.3148],
      [123.8950, 10.3160], [123.8907, 10.3163], [123.8895, 10.3160], [123.8950, 10.3060],
      [123.8960, 10.3045], [123.8967, 10.3039], [123.8990, 10.3015], [123.9015, 10.2946],
      [123.9010, 10.2938], [123.9020, 10.2915], [123.9018, 10.2928], [123.9025, 10.2940],
      [123.9050, 10.2965], [123.9065, 10.2980], [123.9085, 10.2970], [123.9110, 10.2988],
      [123.9048, 10.3042], [123.9080, 10.3108], [123.9100, 10.3168], [123.9125, 10.3230],
      [123.9140, 10.3250]
    ]
  }')
)
ON CONFLICT (shape_id) DO UPDATE SET geom = EXCLUDED.geom;

-- Seed Route 13C shape
INSERT INTO route_shapes (shape_id, geom)
VALUES (
  'shape_13c',
  ST_GeomFromGeoJSON('{
    "type": "LineString",
    "coordinates": [
      [123.9172, 10.3606], [123.9126, 10.3528], [123.9128, 10.3440], [123.9135, 10.3429],
      [123.9126, 10.3413], [123.9118, 10.3340], [123.9075, 10.3265], [123.9050, 10.3178],
      [123.8995, 10.3168], [123.8988, 10.3125], [123.9030, 10.3075], [123.9035, 10.2985],
      [123.9032, 10.2978], [123.9010, 10.2950], [123.9030, 10.2965], [123.9022, 10.2952],
      [123.8990, 10.2995], [123.9068, 10.3035], [123.9100, 10.3168], [123.9050, 10.3178],
      [123.9065, 10.3195], [123.9075, 10.3265], [123.9118, 10.3340], [123.9126, 10.3413],
      [123.9135, 10.3429], [123.9128, 10.3440], [123.9126, 10.3528], [123.9172, 10.3606]
    ]
  }')
)
ON CONFLICT (shape_id) DO UPDATE SET geom = EXCLUDED.geom;

-- 3. Link trips to their route shapes
UPDATE trips SET shape_id = 'shape_01b' WHERE route_id = 'route_01b' OR route_id IN (SELECT route_id FROM routes WHERE route_code = '01B');
UPDATE trips SET shape_id = 'shape_03b' WHERE route_id = 'route_03b' OR route_id IN (SELECT route_id FROM routes WHERE route_code = '03B');
UPDATE trips SET shape_id = 'shape_13c' WHERE route_id = 'route_13c' OR route_id IN (SELECT route_id FROM routes WHERE route_code = '13C');

COMMIT;
