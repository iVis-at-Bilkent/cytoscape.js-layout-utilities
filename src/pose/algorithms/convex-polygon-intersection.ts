/**
 * This module implements O’Rourke-Chien-Olson-Naddor polygon intersection algorithm.
 * However, it only checks if there is an intersection. 
 * Later it can be extended to calculate the intersection area as well.
 */
import { edgeIntersects, IEdge, intersectionCoefficients, pointLineClassification, Side } from "../models/common";
import { Polygon } from "../models/polygon"

export enum AimState {
	/** Only left edge aims to right edge */
	Left = "Left",
	Right = "Right",
	Both = "Both",
	Neither = "Neither"
}

// TODO: test this
export const getAimState = (e1: IEdge, e2: IEdge): AimState => {
	const [a, a_] = intersectionCoefficients(e1, e2);

	return (a < 0) ?
		((a_ < 0) ?
			AimState.Both :
			AimState.Left) :
		((a_ < 0) ?
			AimState.Right :
			AimState.Neither);
}

/**
 * Selects which edge to advance based on the status
 * @returns True if the left edge should be advanced, false otherwise.
 */
const selectAdvance = (e1: IEdge, e2: IEdge): boolean => {

	const aimState = getAimState(e1, e2);

	switch (aimState) {
		case AimState.Left:
			return true;
		case AimState.Right:
			return false;
		case AimState.Both: {
			const side = pointLineClassification(e1, e2.to);
			switch (side) {
				case Side.Right: return false;
				case Side.Left: return true;
			}
		}
		case AimState.Neither: {
			const side = pointLineClassification(e1, e2.to);
			switch (side) {
				case Side.Right: return false;
				// either e1 is right of e2, or neither. Either way we can select e1
				case Side.Left: return true;
			}
		}
	}
}

/**
 * Checks if two polygons has intersections or not. 
 * Returns true if they intersect and false otherwise
 */
export const polygonIntersects = (p1: Polygon, p2: Polygon): boolean => {
	const pPoints = p1.points;
	const qPoints = p2.points;

	let pV = 1, qV = 1;

	const nextPIndex = () => (pV + 1) % pPoints.length;
	const nextQIndex = () => (qV + 1) % qPoints.length;

	const currPEdge: () => IEdge = () => ({ from: pPoints[pV], to: pPoints[nextPIndex()] });
	const currQEdge: () => IEdge = () => ({ from: qPoints[qV], to: qPoints[nextQIndex()] });

	const maxIterations = 3 * (pPoints.length + qPoints.length);

	for (let i = 0; i < maxIterations; i += 1) {
		if (edgeIntersects(currPEdge(), currQEdge())) {
			return true;
		}

		const advanceLeft = selectAdvance(currPEdge(), currQEdge());

		if (advanceLeft) {
			pV = nextPIndex();
		} else {
			qV = nextQIndex();
		}
	}

	return false;
}