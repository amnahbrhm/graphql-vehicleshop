const graphql = require('graphql');
const vehicle = require('./../model/vehicle');

const VehicleSchema = new graphql.GraphQLObjectType({
    name: 'vehicle',
    description: 'a vehicle to be sold',
    fields: {
        _id: {type: graphql.GraphQLString},
        carname: {type: graphql.GraphQLString},
        year: {type: graphql.GraphQLInt},
        transmission: {type: graphql.GraphQLString},
        fuelType: {type: graphql.GraphQLString},
        engineCapacity: {type: graphql.GraphQLInt}
    }
})

const query = new graphql.GraphQLObjectType({
    name: 'vehicleQuery',
    fields: {
        vehicle: {
            type: new graphql.GraphQLList(VehicleSchema),
            args: {
                _id: {type: graphql.GraphQLString},
                carname: {type: graphql.GraphQLString}
            },
            resolve: (_, {_id, carname}) => {
                let where;
                if (_id){
                    where = {_id: _id};
                }else if (carname){
                    where = {carname: carname};
                }else{
                    where = {};
                }
                return vehicle.find(where);
            }
        }
    }
})

const mutation = new graphql.GraphQLObjectType({
    name: 'vehicleMutations',
    fields: {
        create: {
            type: VehicleSchema,
            args: {
                carname: {type: new graphql.GraphQLNonNull(graphql.GraphQLString)},
                year: {type: new graphql.GraphQLNonNull(graphql.GraphQLInt)},
                transmission: {type: new graphql.GraphQLNonNull(graphql.GraphQLString)},
                fuelType: {type: new graphql.GraphQLNonNull(graphql.GraphQLString)},
                engineCapacity: {type: new graphql.GraphQLNonNull(graphql.GraphQLInt)},
            },
            resolve: (_, {carname, year, transmission, fuelType, engineCapacity}) => {
                let v = new vehicle({carname, year, transmission, fuelType, engineCapacity});
                return v.save()
            }
        },
        delete: {
            type: VehicleSchema,
            args: {
                _id: {type: new graphql.GraphQLNonNull(graphql.GraphQLString)}
            },
            resolve: (_, {_id}) => {
                return vehicle.findOneAndRemove(_id);
            }
        }
    }
})

module.exports = new graphql.GraphQLSchema({
    query,
    mutation
})