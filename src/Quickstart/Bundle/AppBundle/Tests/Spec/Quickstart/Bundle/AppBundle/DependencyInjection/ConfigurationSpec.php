<?php

namespace Spec\Quickstart\Bundle\AppBundle\DependencyInjection;

use PhpSpec\ObjectBehavior;
use Prophecy\Argument;
use Symfony\Component\Config\Definition\Builder\TreeBuilder;

class ConfigurationSpec extends ObjectBehavior
{
    function it_is_initializable()
    {
        $this->shouldHaveType('Quickstart\Bundle\AppBundle\DependencyInjection\Configuration');
    }

    /**
     * @TODO: Improve Spec
     */
    function it_should_get_config_tree_builder()
    {
        $this->getConfigTreeBuilder()
            ->shouldHaveType(new TreeBuilder());
    }
}
