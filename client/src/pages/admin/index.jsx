const Admin = () => {
    return (
        <div>
            <div className="grid grid-cols-3 gap-8 justify-items-center p-4">
                {[...Array(28)].map((_, i) => {
                    return <div
                        className="w-4/5 max-h-64 flex flex-col justify-center items-center p-4 gap-2"
                        key={i}
                    >
                        <img
                            style={{
                                boxShadow: "0 0 20px 0 rgba(0, 0, 0, 0.7)",
                            }}
                            className="min-w-full h-full object-cover rounded"
                            src={"/cars/pic" + (i + 1) + ".jpg"}
                            alt=""
                        />
                        <h5 className="font-bold text-xl">{i + 1}</h5>
                    </div>;
                })}
            </div>
        </div>
    );
};

export default Admin;
