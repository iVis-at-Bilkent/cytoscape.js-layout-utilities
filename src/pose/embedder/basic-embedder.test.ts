import * as assert from 'assert';
import { IRectangle } from '../models/common';
import { expandLine } from './basic-embedder';

test('expandLine works', () => {

    // left = line.from
    const line = { from: { x: 0, y: 0 }, to: { x: 5, y: 10 } };

    const bbox: IRectangle = {
        minX: -10, maxX: 10,
        minY: -100, maxY: 100,
    };

    const expandedLine = expandLine(line, bbox);

    assert.deepStrictEqual(expandedLine, { from: { x: -10, y: -20 }, to: { x: 10, y: 20 } });

    // Inverse of line
    const line2 = { from: { x: 5, y: 10 }, to: { x: 0, y: 0 } };

    const expandedLine2 = expandLine(line2, bbox);

    assert.deepStrictEqual(expandedLine2, { from: { x: 10, y: 20 }, to: { x: -10, y: -20 } });

    // Vertical

    const line3 = { from: { x: 5, y: 0 }, to: { x: 5, y: 10 } };

    const expandedLine3 = expandLine(line3, bbox);

    assert.deepStrictEqual(expandedLine3, { from: { x: 5, y: -100 }, to: { x: 5, y: 100 } });
});

