cd src/grpc/catalogpb
npx protoc --ts_out . catalog.proto

cd ../offerpb/
npx protoc --ts_out . offer.proto

cd ../orderpb/
npx protoc --ts_out . order.proto
