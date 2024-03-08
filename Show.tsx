import React, { Children, ReactNode } from 'react';

interface ShowProps {
    children: ReactNode;
}

interface IfProps {
    isTrue: boolean;
    children: ReactNode;
}

interface ElseProps {
    render: boolean;
    children: ReactNode;
}


const Show = (props: ShowProps) => {
    let when: ReactNode = null;
    let otherwise = null;

    Children.forEach(props.children, (child) => {
        if (React.isValidElement(child)) {
            if (!child.props.isTrue) {
                otherwise = child;
            } else if (!when && child.props.isTrue) {
                when = child;
            }
        }
    });
    return when || otherwise;
}
Show.If = ({ isTrue, children }: IfProps) => {
    return isTrue && children;
}
Show.Else = ({ render, children }: ElseProps) => {
    return render && children;
}
export default Show;
