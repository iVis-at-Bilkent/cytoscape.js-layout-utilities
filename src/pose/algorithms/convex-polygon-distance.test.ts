import * as assert from "assert";
import { IEdge } from "../models/common";
import { Polygon } from "../models/polygon";
import { angle, convexPolygonDistance, direction } from "./convex-polygon-distance";
import { AimState, getAimState } from "./convex-polygon-intersection";

test('direction works', () => {
    let l = {
        from: { x: 0, y: 0 },
        to: { x: -10, y: 10 }
    };

    let p1 = { x: -10, y: 0 }, p2 = { x: 0, y: 10 };

    assert(direction(l, p1) > 0);
    assert(direction(l, p2) < 0);

    l = {
        from: l.to,
        to: l.from
    };

    assert(direction(l, p1) < 0);
    assert(direction(l, p2) > 0);
});

test('angle works', () => {
    assert.strictEqual(angle(
        { x: 0, y: 0 },
        { x: 5, y: -5 },
        { x: 5, y: 5 }
    ), Math.PI / 2);

    assert.strictEqual(angle(
        { x: 0, y: 0 },
        { x: 5, y: 5 },
        { x: 5, y: -5 },
    ), -Math.PI / 2);

    assert.strictEqual(angle(
        { x: 0, y: 0 },
        { x: -5, y: 5 },
        { x: -5, y: -5 }
    ), Math.PI / 2);

    assert.strictEqual(angle(
        { x: 0, y: 0 },
        { x: -5, y: -5 },
        { x: 5, y: -5 }
    ), Math.PI / 2);

    assert.strictEqual(angle(
        { x: 0, y: 0 },
        { x: 5, y: 0 },
        { x: -5, y: -5 },
    ), - 3 * Math.PI / 4);
});

test('convexPolygonDistance works', () => {
    let p = Polygon.fromPoints([
        { x:  0, y:  0 },
        { x:  5, y:  5 },
        { x:  5, y: -5 },
        { x: 10, y:  0 },
    ]);

    let q = Polygon.fromPoints([
        { x: 20, y:  0 },
        { x: 25, y:  5 },
        { x: 25, y: -5 },
        { x: 30, y:  0 },
    ]);

    assert.strictEqual(convexPolygonDistance(p, q).distance, 100);
});

describe("getAimState", () => {
	it("should return Both", () => {
		const e1: IEdge = { 
			from: { x: 0, y: 0 },
			to: { x: 5, y: 5 },
		};
		const e2: IEdge = {
			from: { x: 15, y: 0 },
			to: { x: 10, y: 5 },
		};

		assert.strictEqual(getAimState(e1, e2), AimState.Both);
	});

	it("should return Left", () => {
		const e1: IEdge = {
			from: { x: 0, y: 0 },
			to: { x: 5, y: 5 },
		};
		const e2: IEdge = {
			from: { x: 10, y: 5 },
			to: { x: 5, y: 10 },	
		};

		assert.strictEqual(getAimState(e1, e2), AimState.Left);
	});

	it("should return Right", () => {
		const e1: IEdge = {
			from: { x: 0, y: 5 },
			to: { x: 5, y: 10 },
		};
		const e2: IEdge = {
			from: { x: 10, y: 0 },	
			to: { x: 5, y: 5 },
		};

		assert.strictEqual(getAimState(e1, e2), AimState.Right);
	});

	it("should return Neither", () => {
		const e1: IEdge = {
			from: { x: 0, y: 0 },
			to: { x: 5, y: 5 },
		};
		const e2: IEdge = {
			from: { x: 5, y: 0 },
			to: { x: 0, y: 5 },	
		};

		assert.strictEqual(getAimState(e1, e2), AimState.Neither);
	});
});