
type Props = {
    title: string;
    onclick?: () => void;
}

export const Button = ({title, onclick}: Props) => {
    return(
        <button onClick={onclick}>{title}</button>
    )
}