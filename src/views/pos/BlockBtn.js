import React from 'react'
import { CButton, CTooltip } from '@coreui/react'

import useConfirm from '../../utils/useConfirm';

const BlockBtn = (props) => {

    const { clickAction, content, color, label } = props;

    const confirmAction = (closeDialog) => {
        clickAction();
        closeDialog();
    }

    const { showDialog } = useConfirm(confirmAction, label, false);

    return (
        <CTooltip content={content}>
            <CButton
                color={color}
                className="btn-square btn-block"
                variant="outline"
                onClick={showDialog}
                >
                {label}
            </CButton>
        </CTooltip>
    )
}

export default BlockBtn