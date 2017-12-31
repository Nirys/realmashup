<?php
if (isset($ediOrderData->DateTimeQualifier) && !empty($ediOrderData->DateTimeQualifier) ) {
    $arrayValue = unserialize($ediOrderData->DateTimeQualifier);
    if (!is_array($ediOrderData->DateTimeQualifier) ) {

        $dates = $header->addChild('Dates');

        $dates->addChild('DateTimeQualifier', $ediOrderData->DateTimeQualifier);

        $dates->addChild('Date', $ediOrderData->Date);


    } else {

        foreach ($ediOrderData->DateTimeQualifier as $key => $qual) {

            $dates = $header->addChild('Dates');

            $dates->addChild('DateTimeQualifier', $qual);

            $dates->addChild('Date', $ediOrderData->Date[$key]);

        }

    }

}