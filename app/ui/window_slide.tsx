import clsx from "clsx";
import React from "react";

export default function WindowSlide(props: {
	eleIdx: number;
	className?: string,
	style?: React.CSSProperties,
	children: React.ReactNode[],
}) {
	let { current: sliderRef } = React.useRef<HTMLDivElement | null>(null);


	React.useEffect(() => {
		if (!sliderRef) return;

		let accWidthPx = 0;
		for (let i = 0; i < props.eleIdx; i++) {
			const child = sliderRef.children[i];
			const { width } = child.getBoundingClientRect();
			accWidthPx += width;
		}

		sliderRef.style.left = `-${accWidthPx}px`;
	}, [sliderRef, props.eleIdx]);

	return <div className={clsx("relative overflow-hidden", props.className)} style={props.style}>
		<div className="absolute flex overflow-hidden transition-all duration-500" ref={el => { sliderRef = el }}>
			{props.children.map((item, idx) => {
				return <div key={idx}>{item}</div>
			})}
		</div>
	</div >
}
