import * as assert from "assert";
import { cross, diff, edgeIntersects, IEdge, lineIntersection, pointLineClassification, Side } from "./common";

test("diff works", () => {
	const p1 = { x: 3, y: -3 };
	const p2 = { x: -3, y: 3 };

	const pDiff = diff(p1, p2);

	assert.deepStrictEqual(pDiff, { x: 6, y: -6 });
});

test("cross works", () => {
	const p1 = { x: 3, y: 3 };
	const p2 = { x: 3, y: -3 };

	const result1 = cross(p1, p2);
	const result2 = cross(p2, p1);

	assert(result1 < 0);
	assert(result2 > 0);
});

test("pointLineClassification works", () => {
	const edge: IEdge = {
		from: { x: -5, y: -5 },
		to: { x: 5, y: 5 },
	};
	const point1 = { x: 10, y: 5 };
	const point2 = { x: 5, y: 10 };
	const point3 = { x: -5, y: 5 };
	const point4 = { x: -5, y: -15 };

	assert.strictEqual(pointLineClassification(edge, point1), Side.Right);
	assert.strictEqual(pointLineClassification(edge, point2), Side.Left);
	assert.strictEqual(pointLineClassification(edge, point3), Side.Left);
	assert.strictEqual(pointLineClassification(edge, point4), Side.Right);
});

test("edgeIntersects works", () => {
	const edge1: IEdge = {
		from: { x: -5, y: -5 },
		to: { x: 5, y: 5 },
	};
	const edge2: IEdge = {
		from: { x: 5, y: -5 },
		to: { x: -5, y: 5 },
	};
	const edge3: IEdge = {
		from: { x: 100, y: -5 },
		to: { x: 200, y: 5 },
	};

	assert(edgeIntersects(edge1, edge2));
	assert(!edgeIntersects(edge1, edge3));
	assert(!edgeIntersects(edge2, edge3));
});

test("lineIntersection works", () => {
	const edge1: IEdge = {
		from: { x: -5, y: -5 },
		to: { x: 5, y: 5 },
	};
	const edge2: IEdge = {
		from: { x: 5, y: -5 },
		to: { x: -5, y: 5 },
	};

	assert.deepStrictEqual(lineIntersection(edge1, edge2), { x: 0, y: 0 });

	const edge3: IEdge = {
		from: { x: 5, y: 15 },
		to: { x: 15, y: 5 }
	};

	assert.deepStrictEqual(lineIntersection(edge1, edge3), { x: 10, y: 10 });

	const edge4: IEdge = {
		from: { x: 15, y: 5 },
		to: { x: 25, y: -5 }
	};

	assert.deepStrictEqual(lineIntersection(edge1, edge4), { x: 10, y: 10 });
});