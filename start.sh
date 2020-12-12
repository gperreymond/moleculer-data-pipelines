#!/bin/bash

./kind create cluster --name infra --config cluster.yaml
kubectl cluster-info --context kind-infra
