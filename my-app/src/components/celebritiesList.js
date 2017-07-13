import React from 'react';

export const CelebritiesList = ({theCelebrities = [], currencySymbol = "", currencyValue="1"}) => {
    let celebritiesContent = [];
    if(theCelebrities.length === 0){
        return <div className="celebrity text-center">
                <div className="row form-group clearfix">
                    <div className="col-md-6 col-md-offset-3">
                        <h4 className="celebrityHeader celebrityItemDetail">No Results Found</h4>
                    </div>
                </div>
            </div>
    }

    for(var i=0;i<theCelebrities.length;i++){
        let theCelebrity = theCelebrities[i]
        celebritiesContent.push(
            <div key={theCelebrity.rank} className="celebrity text-center list-group-item">
                <div className="row form-group clearfix">
                    <div className="col-md-12">
                        <h4 className="celebrityHeader celebrityItemDetail">No: {theCelebrity.rank}</h4>
                        <div className="celebrityItemDetail">Name: {theCelebrity.name}</div>
                        <div className="celebrityItemDetail">Net Worth: {currencySymbol} {theCelebrity.netWorth * currencyValue}</div>
                        <div className="celebrityItemDetail">Age: {theCelebrity.age}</div>
                        <div className="celebrityItemDetail">Country of Birth: {theCelebrity.country}</div>
                    </div>
                </div>
            </div>);
    }
    
    return <div className="celebritiesList box list-group clearfix">
        {celebritiesContent}
    </div>
}

export default CelebritiesList;