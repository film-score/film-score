import React from 'react'
import { Row, Col, Table } from 'reactstrap';

const DashboardTable = (props) => {
    const tableRows = props.rows.map((row, index) => {
        return <tr>
            <td><a href={"/film/" + row.id} className="text-light">{row.film_info[0].title}</a></td>
            <td>{row.composite_score}</td>
            <td>{new Date(row.score_date).toLocaleDateString()}</td>
            {/* <td className="text-center"><a href={"/scores/"+row.id} className="btn btn-sm btn-outline-info">Details</a></td> */}
        </tr>
    })
    return <Row>
        <Col>
            <Table dark striped>
                <thead>
                    <tr>
                        <th scope="row">Film</th>
                        <th>Composite Score</th>
                        <th>Date</th>
                        {/* <th></th> */}
                    </tr>
                </thead>
                <tbody>
                    {tableRows}
                </tbody>
            </Table>
        </Col>
    </Row>
}

export default DashboardTable