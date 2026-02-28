
type Props = {
    text: string;
    onchange: (value: string) => void;
    placeholder?: string;
}
export const InputField = ({text, onchange}: Props) => {
    return (
        <input type="text" value={text} onChange={(e) => onchange(e.target.value)} placeholder="Enter Task..."/>
    )
}