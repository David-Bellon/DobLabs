pragma solidity >= 0.8.7;


contract Trade {
    //The uint pair is 0 == BTC, 1 == ETH
    struct trade_info {
        address addr;
        uint256 pair;
        uint256 open_price;
        uint256 amount;
        uint256 liquidation_price;
        bool isLong;
    }

    trade_info[] public trades;

    function open_position(uint256 amount, uint256 pair, bool isLong) public returns(bool){
        trades.push(trade_info(msg.sender, pair, 100, amount, 300, isLong));
        return true;
    }


    function close_position(uint256 amount, uint256 pair, bool isLong) public returns(string memory){
        for(uint i = 0; i < getNumberTrades(); i++){
            if(trades[i].addr == msg.sender && trades[i].pair == pair && trades[i].isLong == isLong){
                require(trades[i].addr == msg.sender, "You are not the owner of the trade");
                require(trades[i].pair == pair, "Not the same pair");
                require(trades[i].isLong == isLong, "Not maching in direction");
                trades[i].amount = trades[i].amount - amount;
                if (trades[i].amount == 0){
                    trades[i] = trades[getNumberTrades() - 1];
                    delete trades[getNumberTrades() - 1];
                    return "Position Updated and Closed";
                }
                return "Position Updated";
            }
        }
        return "No posiions that match your input";
    }


    function getNumberTrades() public view returns(uint){
        return trades.length;
    }
}