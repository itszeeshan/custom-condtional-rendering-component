import React from "react";
import Show from "./Show";

const UseShow = () => {
  return (
        <>
        <Show>
            <Show.If isTrue={true}>
                <div>True</div>
            </Show.If>
            <Show.Else>
                <div>False</div>
            </Show.Else>
        </Show>
        </>
    );
}
