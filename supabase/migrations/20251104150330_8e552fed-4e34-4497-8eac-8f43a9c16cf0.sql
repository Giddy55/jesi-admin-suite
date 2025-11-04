-- Reduce schools to 6 by deleting 4 schools
DELETE FROM schools WHERE id IN (
  'bf12471c-d7c6-4ef1-a6ec-0349f346db5d',
  'e56373b5-abde-474e-b868-b2d428b1f83e',
  'f83ff3d4-192a-49fb-8302-d9ecd2940b7c',
  '3379613a-7a89-4d1d-ad28-23ce68f014ea'
);