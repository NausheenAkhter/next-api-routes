import { getAllEvents } from "../../../dummy-data"

const handler = (req, res) => {
    return res.status(200).json({ code: 0, events: getAllEvents() })
}
export default handler